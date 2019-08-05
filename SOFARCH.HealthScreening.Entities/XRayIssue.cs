using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Entities
{
    public class XRayIssue : BaseEntity
    {
        public Int32? XRayIssueId { get; set; }

        public Int32? XRayIssueNo { get; set; }

        public string XRayIssueDate { get; set; }

        public Int32? PatientId { get; set; }

        public bool? IsECGDone { get; set; }

        public string PartOfBodyToXRay { get; set; }

        public string Purpose { get; set; }

        public string Impression { get; set; }

        public List<XRayFilmUsed> XRayFilmsUsed { get; set; }

        public string PatientName { get; set; }

        public Int32? EmployerId { get; set; }

        public Int32? EmployerCode { get; set; }

        public string EmployerName { get; set; }

        public Int32? PatientCode { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string XRayIssueFromDate { get; set; }

        public string XRayIssueToDate { get; set; }

    }
}
