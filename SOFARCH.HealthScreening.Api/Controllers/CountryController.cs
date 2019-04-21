﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SOFARCH.HealthScreening.API.Controllers
{
    public class CountryController : ApiController
    {
        private readonly Business.Country _country;

        public CountryController()
        {
            _country = new Business.Country();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [Route("GetAllCountries")]
        public List<Entities.Country> GetAllCountries()
        {
            return _country.GetAllCountries();
        }
    }
}
