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
                DoWork(meeting);
            }
        }

        // Create a work folder in DATAFILES/PROCESSING and process the recording
        public void DoWork(Meeting meeting)
        {
            // Create workfolder
            string workFolderPath = CreateWorkFolder(meeting);

            // transcribe recording
            string sourceFilePath = config.DatafilesPath + "\\RECEIVED\\" + meeting.SourceFilename;
            processRecording.Process(sourceFilePath, workFolderPath, meeting.Language);

            meeting.WorkStatus = WorkStatus.Proofreading;
            meeting.Approved = false;
        }

        private string CreateWorkFolder(Meeting meeting)
        {
            string workfolderName = meetingRepository.GetLongName(meeting.Id);
            string workFolderPath = config.DatafilesPath + "\\PROCESSING\\" + workfolderName;

            if (!GMFileAccess.CreateDirectory(workFolderPath))
            {
                Console.WriteLine($"ProcessRecordings - ERROR: could not create meeting folder {workFolderPath}");
                return null;
            }

            return workFolderPath;
        }
    }
}
