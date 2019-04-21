using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SOFARCH.HealthScreening.API.Controllers
{
    public class BranchController : ApiController
    {
        private readonly Business.Branch _branch;

        public BranchController()
        {
            _branch = new Business.Branch();
        }

        [Route("GetAllBranchNames")]
        public List<Entities.Branch> GetAllBranchNames()
        {
            return _branch.GetAllBranchNames();
        }

        [Route("GetAllBranchNamesByCompany/{companyId}")]
        public List<Entities.Branch> GetAllBrancheNamesByCompany(Int32 companyId)
        {
            return _branch.GetAllBranchNamesByCompany(companyId);
        }
    }
}
