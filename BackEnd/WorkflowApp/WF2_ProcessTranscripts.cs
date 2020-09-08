using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
//using GM.ProcessRecording;
using GM.ProcessTranscript;
using GM.ViewModels;
using Microsoft.Extensions.Options;
using GM.Configuration;
//using GM.FileDataRepositories;
using GM.DatabaseRepositories;
using GM.DatabaseModel;
using Microsoft.Extensions.Logging;
using GM.Utilities;
using ChinhDo.Transactions;
using System.Transactions;
using GM.FileDataRepositories;

namespace GM.Workflow
{
    public class WF2_ProcessTranscripts
    {
        readonly ILogger<WF2_ProcessTranscripts> logger;
        readonly AppSettings config;
        readonly ITranscriptProcess transcriptProcess;
        readonly IMeetingRepository meetingRepository;
        readonly IFileRepository fileRepository;

        public WF2_ProcessTranscripts(
            ILogger<WF2_ProcessTranscripts> _logger,
            IOptions<AppSettings> _config,
            ITranscriptProcess _transcriptProcess,
            IMeetingRepository _meetingRepository,
            IFileRepository _fileRepository
           )
        {
            logger = _logger;
            config = _config.Value;
            transcriptProcess = _transcriptProcess;
            meetingRepository = _meetingRepository;
            fileRepository = _fileRepository;
        }

        public void Run()
        {
            // 
            bool? isApproved = true;        // We want the received transcripts that were approved.
            if (!config.RequireManagerApproval) isApproved = null;  // unless config setting says otherwise.
            List<Meeting> meetings = meetingRepository.FindAll(SourceType.Transcript, WorkStatus.Received, isApproved);

            foreach (Meeting meeting in meetings)
            {
                    DoWork(meeting);
            }

        }

        private void DoWork(Meeting meeting)
        {
            string workFolderPath = fileRepository.WorkFolderPath(meeting.Id);
            string sourceFilePath = fileRepository.SourceFilePath(meeting.Id);
            string fileExtension = Path.GetExtension(sourceFilePath);
            string toProcessFilePath = workFolderPath + @"\toProcess." + fileExtension;
            string processedFilePath = workFolderPath + @"\processed." + fileExtension;

            // If the workfolder exists, it most likely means the system crashed while trying to
            // process this meeting earlier. Remove the folder and try again.
            if (Directory.Exists(workFolderPath))
            {
                GMFileAccess.DeleteDirectoryAndContents(workFolderPath);
            }

            // Wrap the file and database operations in the same transaction
            TxFileManager fileMgr = new TxFileManager();
            using (TransactionScope scope = new TransactionScope())
            {

                fileMgr.CreateDirectory(workFolderPath);


                fileMgr.Move(sourceFilePath, toProcessFilePath);

                meeting.WorkStatus = WorkStatus.Processing;
                meeting.Approved = false;

                // TODO - Write the meeting changes to the DB.

                scope.Complete();
            }

            string processedOutputFile = transcriptProcess.Process(toProcessFilePath, workFolderPath, meeting.Language);

            using (TransactionScope scope = new TransactionScope())
            {

                fileMgr.Copy(processedOutputFile, processedFilePath, true);

                meeting.WorkStatus = WorkStatus.Processed;
                meeting.Approved = false;

                // TODO - Write the meeting changes to the DB.

                scope.Complete();
            }
        }


    }
}

