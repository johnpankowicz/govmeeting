using Xunit;
using GM.Workflow;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Logging;
using GM.Configuration;
using GM.DatabaseRepositories;
using GM.ProcessTranscript;
using GM.Utilities;
using Moq;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
using GM.DatabaseModel;
using GM.FileDataRepositories;

namespace GM.WorkflowApp.Tests
{
    public class WF2_ProcessTranscriptsTests
    {
        NullLogger<WF2_ProcessTranscripts> logger;
        IOptions<AppSettings> config;
        ITranscriptProcess transcriptProcess;
        IMeetingRepository meetingRepository;
        IFileRepository fileRepository;

        [Fact()]
        public void Create_WF2_ProcessTranscriptsTest()
        {
            SetupMocks();
            WF2_ProcessTranscripts wf2 = new WF2_ProcessTranscripts(logger, config, transcriptProcess, meetingRepository, fileRepository);
            Assert.True(wf2 != null, "Create new WF2_ProcessTranscripts");
        }

        [Fact()]
        public void RunTest()
        {
            SetupMocks();
            WF2_ProcessTranscripts wf2 = new WF2_ProcessTranscripts(logger, config, transcriptProcess, meetingRepository, fileRepository);
            wf2.Run();
            Assert.True(wf2 != null, "Create new WF2_ProcessTranscripts");
        }

        private void SetupMocks()
        {
            logger = new NullLogger<WF2_ProcessTranscripts>();
            transcriptProcess = new MockTranscriptProcess();
            meetingRepository = new MockMeetingRepository();
            fileRepository = new MockFileRepository();

            AppSettings appsettings = new AppSettings()
            {
                //DatafilesPath = Guid.NewGuid();
                DatafilesPath = @"C:\TMP\DATAFILES" + Guid.NewGuid(),
                RequireManagerApproval = true
            };
            var mock = new Mock<IOptions<AppSettings>>();
            mock.Setup(a => a.Value).Returns(appsettings);
            config = mock.Object;
        }

    }

    public class MockTranscriptProcess : ITranscriptProcess
    {
        public string Process(string destFilePath, string workFolderPath, string language)
        {
            return "";
        }
    }

    public class MockFileRepository: IFileRepository
    {
        public string WorkFolderPath(long id) { return ""; }
        public string SourceFilePath(long id) { return ""; }
    }


    public class MockMeetingRepository : IMeetingRepository
    {
        public Meeting Get(long meetingId) { return new Meeting(); }
        public long GetId(Meeting meeting) { return 0; }
        public Meeting Get(long govBodyId, DateTime datetime) { return new Meeting(); }
        public long Add(Meeting m) { return 0; }
        public List<Meeting> FindAll(SourceType? sourceType, WorkStatus? workStatus, bool? approved)
        {
            List<Meeting> listMeeting = new List<Meeting>()
            {
                new Meeting()
                {
                    Id = 1,
                    Name = "Monthly Council Meeting",
                    Date = new DateTime(2019, 9, 8),
                    Length = 1810,
                    Sections = null,
                    GovBodyId = 7,
                    SourceFilename = "USA_ME_LincolnCounty_BoothbayHarbor_Selectmen_en_2014-09-08.mp4",
                    SourceType = SourceType.Transcript,
                    WorkStatus = WorkStatus.Received,
                    Approved = false
               }
            };
            return listMeeting;
        }
        public string GetLongName(long meetingId) { return "USA_ME_LincolnCounty_BoothbayHarbor_Selectmen_en_2014-09-08"; }
        public string GetSourceFilename(long meetingId) { return "USA_ME_LincolnCounty_BoothbayHarbor_Selectmen_en_2014-09-08.mp4"; }

        }

    }