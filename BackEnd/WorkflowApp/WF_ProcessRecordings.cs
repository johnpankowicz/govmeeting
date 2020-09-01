using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using GM.ProcessRecording;
using GM.ProcessTranscript;
using GM.ViewModels;
using Microsoft.Extensions.Options;
using GM.Configuration;
using GM.FileDataRepositories;
using GM.DatabaseRepositories;
using GM.DatabaseModel;
using Microsoft.Extensions.Logging;
using GM.Utilities;

namespace GM.Workflow
{
    public class WF_ProcessRecordings
    {
        readonly AppSettings config;
        readonly RecordingProcess processRecording;
        readonly IGovBodyRepository govBodyRepository;
        readonly IMeetingRepository meetingRepository;
        readonly ILogger<WF_ProcessRecordings> logger;

        WorkSegments workSegments = new WorkSegments();

        public WF_ProcessRecordings(
            ILogger<WF_ProcessRecordings> _logger,
            IOptions<AppSettings> _config,
            RecordingProcess _processRecording,
            IGovBodyRepository _govBodyRepository,
            IMeetingRepository _meetingRepository
           )
        {
            config = _config.Value;

            logger = _logger;
            processRecording = _processRecording;
            meetingRepository = _meetingRepository;
            govBodyRepository = _govBodyRepository;
        }

        // Find all new received meetings whose source is a recording and approved status is true.
        public void Run()
        {
            // Do we need manager approval?
            bool? approved = true;
            if (!config.RequireManagerApproval) approved = null;
            List<Meeting> meetings;

            meetings = meetingRepository.FindAll(SourceType.Recording, WorkStatus.Received, approved);
            foreach (Meeting meeting in meetings)
            {
                TranscribeRecording(meeting);
            }

            meetings = meetingRepository.FindAll(SourceType.Recording, WorkStatus.Editing, approved);
            foreach (Meeting meeting in meetings)
            {
                CheckIfEditingCompleted(meeting);
            }
        }

        // Create a work folder in DATAFILES/PROCESSING and process the recording
        private void TranscribeRecording(Meeting meeting)
        {
            // Create workfolder
            string workfolderPath = GetWorkfolderPath(meeting);
            if (!CreateWorkfolder(workfolderPath))
            {
                return;
            }

            // transcribe recording
            string sourceFilePath = config.DatafilesPath + "\\RECEIVED\\" + meeting.SourceFilename;
            processRecording.Process(sourceFilePath, workfolderPath, meeting.Language);

            meeting.WorkStatus = WorkStatus.Editing;

            // if true, editing will be allowed to proceed automatically.
            // set to false to require manager approval.
            meeting.Approved = true;
        }

        private void CheckIfEditingCompleted(Meeting meeting)
        {
            string workfolderPath = GetWorkfolderPath(meeting);
            if (workSegments.CheckIfFinished(workfolderPath))
            {
                workSegments.Combine(workfolderPath, "ToView.json");
            }

            meeting.WorkStatus = WorkStatus.Edited;
            meeting.Approved = false;
        }


        private string GetWorkfolderPath(Meeting meeting)
        {
            string workfolderName = meetingRepository.GetLongName(meeting.Id);
            string workFolderPath = config.DatafilesPath + "\\PROCESSING\\" + workfolderName;

            return workFolderPath;
        }

        private bool CreateWorkfolder(string workFolderPath)
        {
            if (!GMFileAccess.CreateDirectory(workFolderPath))
            {
                Console.WriteLine($"ProcessRecordings - ERROR: could not create meeting folder {workFolderPath}");
                return false;
            }
            return true;
        }
    }
}
