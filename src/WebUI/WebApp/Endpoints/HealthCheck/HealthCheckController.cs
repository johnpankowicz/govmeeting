using Microsoft.AspNetCore.Mvc;

namespace GM.WebUI.WebApp.Features.Meetings
{
    [Route("api/[controller]")]
    public class HealthCheckController : Controller
    {
        // TODO This is temporary till we implement calling ApiHealthCheck

        [HttpGet("{testId}")]
        public string Get(int testId)
        {
            int timesTwo = testId * 2;
            string ret = timesTwo.ToString();
            return ret;
        }
    }
}
