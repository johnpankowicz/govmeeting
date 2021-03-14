using Microsoft.AspNetCore.Mvc;

namespace GM.WebUI.WebApp.Endpoints.HealthCheck
{
    public class HealthCheckController : ApiController
    {

        /// <summary>
        /// Get Health Check
        /// </summary>
        /// <returns> "Healthy" </returns>
        [HttpGet]
        public string Get()
        {
            return "Healthy";
        }


    }
}

