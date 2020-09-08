using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using GM.ViewModels;
using Microsoft.Extensions.Options;
using GM.Configuration;
using GM.DatabaseRepositories;
using GM.DatabaseModel;
using Microsoft.Extensions.Logging;

namespace GM.Workflow
{
    public class WF8_SendAlerts

    {
        readonly AppSettings config;
        readonly IMeetingRepository meetingRepository;
        readonly ILogger<WF8_SendAlerts> logger;

        public WF8_SendAlerts(
            ILogger<WF8_SendAlerts> _logger,
            IOptions<AppSettings> _config,
            IMeetingRepository _meetingRepository
           )
        {
            config = _config.Value;
            logger = _logger;
            meetingRepository = _meetingRepository;
        }

        // Find all meetings that have been loaded into the database.
        public void Run()
        {

            List<Meeting> meetings = meetingRepository.FindAll(null, WorkStatus.Loaded, true);

            foreach (Meeting meeting in meetings)
            {
                DoWork(meeting);
            }

        }

        public void DoWork(Meeting meeting)
        {

            // TODO - Send alerts

            meeting.WorkStatus = WorkStatus.Alerted;
        }

    }
}
