using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SOFARCH.HealthScreening.API.Controllers
{
    public class UnitsOfMeasurementController : ApiController
    {
        private readonly Business.UnitsOfMeasurement _unitsOfMeasurement;

        public UnitsOfMeasurementController()
        {
            _unitsOfMeasurement = new Business.UnitsOfMeasurement();
        }


        /// <summary>
        /// Get all style sizes
        /// </summary>
        /// <returns>Return as list of style sizes</returns>
        [Route("GetAllUnitsOfMeasurement")]
        public List<Entities.UnitsOfMeasurement> GetAllUnitsOfMeasurement()
        {
            return _unitsOfMeasurement.GetAllUnitsOfMeasurement();
        }


        [HttpGet]
        [Route("GetAllUnitIdAndUnitCode")]
        public List<Entities.UnitsOfMeasurement> GetAllUnitIdAndUnitCode()
        {
            return _unitsOfMeasurement.GetAllUnitIdAndUnitCode();
        }

    }
}
