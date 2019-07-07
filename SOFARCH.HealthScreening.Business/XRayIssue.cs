using SOFARCH.HealthScreening.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Business
{
    public class XRayIssue
    {
        private readonly DataModel.XRayIssue _xrayIssue;

        public XRayIssue()
        {
            _xrayIssue = new DataModel.XRayIssue();
        }

        public Entities.XRayFilmUsed GetFilmDetailsByDrugId(Int32 drugId)
        {
            return _xrayIssue.GetFilmDetailsByDrugId(drugId);
        }

        public List<Entities.XRayIssue> SearchXRayIssue(Entities.XRayIssue xRayIssue)
        {
            return _xrayIssue.SearchXRayIssue(xRayIssue);
        }

        public List<Entities.XRayIssue> GetPastXRayIssueDatesByPatientId(Int32 patientId)
        {
            return _xrayIssue.GetPastXRayIssueDatesByPatientId(patientId);
        }

        public List<Entities.XRayFilmUsed> GetFilmUsedDetailsByXRayIssueId(Int32 xrayIssueId)
        {
            return _xrayIssue.GetFilmUsedDetailsByXRayIssueId(xrayIssueId);
        }

        public Int32 SaveXRayIssueDetails(Entities.XRayIssue xRayIssue)
        {
            return _xrayIssue.SaveXRayIssueDetails(xRayIssue);
        }

    }
}
