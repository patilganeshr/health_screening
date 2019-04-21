using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SOFARCH.HealthScreening.API.Controllers
{
    public class CityController : ApiController
    {
        private readonly Business.City _city;

        public CityController()
        {
            _city = new Business.City();
        }

        
        [HttpPost]
        [Route("DeleteCity")]
        public bool DeleteCity(Entities.City city)
        {
            return _city.DeleteCity(city);
        }

        [HttpGet]
        [Route("IsCityNameExists/{stateId}/{cityName}")]
        public bool IsCityNameExists(Int32 stateId, string cityName)
        {
            return _city.IsCityNameExists(stateId, cityName);
        }

        [HttpPost]
        [Route("UpdateCity")]
        public Int32 UpdateCity(Entities.City city)
        {
            return _city.UpdateCity(city);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [Route("GetCitiesByState/{stateId}")]
        public List<Entities.City> GetCitiesByState(Int32 stateId)
        {
            return _city.GetCitiesByState(stateId);
        }

        [HttpPost]
        [Route("SaveCity")]
        public Int32 SaveCity(Entities.City city)
        {
            return _city.SaveCity(city);
        }

    }
}
