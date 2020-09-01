using System;
using System.IO;
using Microsoft.Extensions.Options;
using GM.Configuration;
using GM.FileDataRepositories;
using GM.DatabaseRepositories;
using GM.DatabaseModel;

namespace GM.Workflow
{
    public class WF_RetrieveOnlineFiles
    {
        // TODO - IMPLEMENT THIS CLASS

        /*   ===== RetrieveOnlineFiles will:
         * Read the meeting schedules of each GovBody in the database.
         * If a current meeting may have taken place, it will:
         *    Check the website where either its transcript or a recording may be found.
         *    If found it will:
         * Start the file retrieval.
         * Store the retieved file in the "DATAFILES/RECEIVED" folder.
         * Create a new Meeting record for the GovBody
         * Set the Meeting WorkStatus property to "Received"
         * Set the Meeting Approved property to false".
         * Send the GovBody managers a "RECEIVED" message.
         * Repeat for each government body.
         *
         *  New meetings can also added to a GovBody by:
         *      * the phone app for recording a meeting
         *      * a file being uploaded by a registered user with appropriate rights.
         */

        readonly AppSettings _config;
        readonly IGovBodyRepository govBodyRepository;
        readonly IMeetingRepository meetingRepository;

        public WF_RetrieveOnlineFiles(
            IOptions<AppSettings> config,
            IGovBodyRepository _govBodyRepository,
            IMeetingRepository _meetingRepository
           )
        {
            _config = config.Value;
            govBodyRepository = _govBodyRepository;
            meetingRepository = _meetingRepository;
        }
        public void Run()
        {
            string incomingPath = _config.DatafilesPath + @"\RECEIVED";
            Directory.CreateDirectory(incomingPath);
            
            RetrieveNewFiles(incomingPath);

        }

        public void RetrieveNewFiles(string incomingPath)
        {
            // throw new NotImplementedException();
        }
    }
}
