using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SOFARCH.HealthScreening.API.Controllers
{
    public class BloodGroupController: ApiController
    {
        private readonly Business.BloodGroup _bloodGroup;

        public BloodGroupController()
        {
            _bloodGroup = new Business.BloodGroup();
        }

        [Route("GetAllBloodGroups")]
        public List<Entities.BloodGroup> GetAllBloodGroups()
        {
            return _bloodGroup.GetAllBloodGroups();
        }

    }
}
