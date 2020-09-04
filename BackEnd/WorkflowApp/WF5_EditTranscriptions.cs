using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Options;
using GM.Configuration;
using Newtonsoft.Json;
using GM.FileDataRepositories;
using GM.ViewModels;
using GM.DatabaseRepositories;
using GM.DatabaseModel;
using GM.EditTranscript;

namespace GM.Workflow
{

    public class WF5_EditTranscriptions
    {
        readonly AppSettings config;

        readonly IMeetingRepository meetingRepository;

        public WF5_EditTranscriptions(
            IOptions<AppSettings> _config,
            IMeetingRepository _meetingRepository
            )
        {
            config = _config.Value;
            meetingRepository = _meetingRepository;
        }

        public void Run()
        {
            List<Meeting> transcribedMeetings = meetingRepository.FindAll(SourceType.Recording, WorkStatus.Transcribed, true);
            foreach (Meeting meeting in transcribedMeetings)
            {
                StartEditing(meeting);
            }

            List<Meeting> proofreadingMeetings = meetingRepository.FindAll(SourceType.Recording, WorkStatus.Editing, null);
            foreach (Meeting meeting in proofreadingMeetings)
            {
                CheckIfEditingCompleted(meeting);
            }

        }

        private void StartEditing(Meeting meeting)
        {
            ///// Reformat the JSON transcript to match what the fixasr routine will use.

            //ModifyTranscriptJson_1 convert = new ModifyTranscriptJson_1();
            //outputJsonFile = meetingFolder + "\\" + "04-ToFix.json";
            //FixasrView fixasr = convert.Modify(transcript);
            //stringValue = JsonConvert.SerializeObject(fixasr, Formatting.Indented);
            //File.WriteAllText(outputJsonFile, stringValue);



            //WorkSegments split = new WorkSegments();
            //split.Split(meetingFolder, videofileCopy, outputJsonFile, config.FixasrSegmentSize,
            //    config.FixasrSegmentOverlap);


            string fixasrText = "";

            // TODO - Check each part of the transcribed meeting.
            // Each should contain a xxxxx-DONE.json.
            // Append them all together into fixasrText.

            bool b = true;
            if (b) return;

            FixasrView fixasr = JsonConvert.DeserializeObject<FixasrView>(fixasrText);
            FormatConversions formatConversions = new FormatConversions();
            AddtagsView addtags = formatConversions.ConvertFixasrToAddtags(fixasr);

            //addtagsRepository.Put(addtags, meeting.Id);

        }

        private void CheckIfEditingCompleted(Meeting meeting)
        {
            string workfolder = meetingRepository.GetLongName(meeting.Id);
            string workFolderPath = config.DatafilesPath + "\\PROCESSING\\" + workfolder;

            // TODO - When all of the tagging for a specific transcript is completed, it should:
            //   Change the WorkStatus field in the Meeting Record from "Tagging" to "Tagged"
            //   Send a message to the manager(s) that tagging is completed for a meeting.

        }

        //private void CheckIfEditingCompleted(Meeting meeting)
        //{
        //    string workfolderPath = GetWorkfolderPath(meeting);
        //    if (workSegments.CheckIfFinished(workfolderPath))
        //    {
        //        workSegments.Combine(workfolderPath, "ToView.json");
        //    }

        //    meeting.WorkStatus = WorkStatus.Edited;

        //    // Edited transcript needs to be approved before it is available to view.
        //    meeting.Approved = false;
        //}


    }
}
