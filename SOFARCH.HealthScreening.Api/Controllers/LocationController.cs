using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SOFARCH.HealthScreening.API.Controllers
{
    public class LocationController : ApiController
    {
        private readonly Business.Location _location;

        public LocationController()
        {
            _location = new Business.Location();
        }

        /// <summary>
        /// Get All Locations with Location Type
        /// </summary>
        /// <returns>Will return a list of Location.</returns>
        [Route("GetAllLocationsWithLocationTypes")]
        public List<Entities.Location> GetAllLocationsWithLocationTypes()
        {
            return _location.GetAllLocationsWithLocationTypes();
        }

    }
}
