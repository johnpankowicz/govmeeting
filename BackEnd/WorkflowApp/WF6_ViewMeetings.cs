using System;
using System.Collections.Generic;
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
using GM.EditTranscript;

namespace WorkflowApp
{
    /* The final meeting transctipt is ready for viewing, when either:
     *  1.  An original transcript has been processed and tagged.
     *  OR
     *  2. An original recording has been transcribed and edited.
     */

    class WF6_ViewMeetings
    {
        readonly AppSettings config;
        readonly IMeetingRepository meetingRepository;
        readonly ILogger<WF6_ViewMeetings> logger;
        readonly WorkSegments workSegments = new WorkSegments();

        public WF6_ViewMeetings(
            ILogger<WF6_ViewMeetings> _logger,
            IOptions<AppSettings> _config,
            IMeetingRepository _meetingRepository
           )
        {
            config = _config.Value;
            logger = _logger;
            meetingRepository = _meetingRepository;
        }

        public void Run()
        {
            // Do we need manager approval?
            bool? approved = true;
            if (!config.RequireManagerApproval) approved = null;
            List<Meeting> meetings;

            // Find all tagged transcripts or edited transcriptions

            meetings = meetingRepository.FindAll(SourceType.Transcript, WorkStatus.Tagged, approved);
            foreach (Meeting meeting in meetings)
            {
                ViewTaggedTranscript(meeting);
            }

            meetings = meetingRepository.FindAll(SourceType.Recording, WorkStatus.Edited, approved);
            foreach (Meeting meeting in meetings)
            {
                ViewEditedTranscription(meeting);
            }
        }

        private void ViewTaggedTranscript(Meeting meeting)
        {

        }

        private void ViewEditedTranscription(Meeting meeting)
        {

        }

    }
}
