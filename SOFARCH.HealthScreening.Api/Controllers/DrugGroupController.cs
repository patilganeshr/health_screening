using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SOFARCH.HealthScreening.Api.Controllers
{
    public class DrugGroupController : ApiController
    {
        private readonly Business.DrugGroup _drugGroup;

        public DrugGroupController()
        {
            _drugGroup = new Business.DrugGroup();
        }

        [Route("GetDrugGroupIdAndGroupName")]
        public List<Entities.DrugGroup> GetDrugGroupIdAndGroupName()
        {
            return _drugGroup.GetDrugGroupIdAndGroupName();
        }

        [Route("GetDrugGroupDetailsById/{drugGroupId}")]
        public Entities.DrugGroup GetDrugGroupDetailsById(Int32 drugGroupId)
        {
            return _drugGroup.GetDrugGroupDetailsById(drugGroupId);
        }

        [Route("GetDrugGroupDetailsByName/{drugGroupName}")]
        public Entities.DrugGroup GetDrugGroupDetailsByName(string drugGroupName)
        {
            return _drugGroup.GetDrugGroupDetailsByName(drugGroupName);
        }
        [HttpGet]
        [Route("SearchAllDrugGroups")]
        public List<Entities.DrugGroup> SearchAllDrugGroups()
        {
            return _drugGroup.SearchAllDrugGroups();
        }

        [HttpGet]
        [Route("SearchDrugGroupsByGroupName/{groupName}")]
        public List<Entities.DrugGroup> SearchDrugGroupsByGroupName(string groupName)
        {
            return _drugGroup.SearchDrugGroupsByGroupName(groupName);
        }

        [HttpPost]
        [Route("SaveDrugGroup")]
        public Int32 SaveDrugGroup(Entities.DrugGroup drugGroup)
        {
            return _drugGroup.SaveDrugGroup(drugGroup);
        }


    }
}
