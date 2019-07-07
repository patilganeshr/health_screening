using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SOFARCH.HealthScreening.Api.Controllers
{
    public class XRayIssueController : ApiController
    {
        private readonly Business.XRayIssue _xrayIssue;

        public XRayIssueController()
        {
            _xrayIssue = new Business.XRayIssue();
        }

        [Route("GetFilmDetailsByDrugId/{drugId}")]
        public Entities.XRayFilmUsed GetFilmDetailsByDrugId(Int32 drugId)
        {
            return _xrayIssue.GetFilmDetailsByDrugId(drugId);
        }

        [HttpPost]
        [Route("SearchXRayIssue")]
        public List<Entities.XRayIssue> SearchXRayIssue(Entities.XRayIssue xRayIssue)
        {
            return _xrayIssue.SearchXRayIssue(xRayIssue);
        }

        [Route("GetPastXRayIssueDatesByPatientId/{patientId}")]
        public List<Entities.XRayIssue> GetPastXRayIssueDatesByPatientId(Int32 patientId)
        {
            return _xrayIssue.GetPastXRayIssueDatesByPatientId(patientId);
        }

        [Route("GetFilmUsedDetailsByXRayIssueId/{xrayIssueId}")]
        public List<Entities.XRayFilmUsed> GetFilmUsedDetailsByXRayIssueId(Int32 xrayIssueId)
        {
            return _xrayIssue.GetFilmUsedDetailsByXRayIssueId(xrayIssueId);
        }

        [HttpPost]
        [Route("SaveXRayIssueDetails")]
        public Int32 SaveXRayIssueDetails(Entities.XRayIssue xRayIssue)
        {
            return _xrayIssue.SaveXRayIssueDetails(xRayIssue);
        }

    }
}
