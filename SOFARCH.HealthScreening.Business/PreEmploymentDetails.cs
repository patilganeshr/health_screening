using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Business
{
    public class PreEmploymentDetails
    {
        private readonly DataModel.PreEmploymentDetails _preEmploymentDetails;

        public PreEmploymentDetails()
        {
            _preEmploymentDetails = new DataModel.PreEmploymentDetails();
        }

        public Entities.PreEmploymentDetails GetPatientAndTestDetails(Int32 patientId)
        {
            return _preEmploymentDetails.GetPatientAndTestDetails(patientId);
        }

        public List<Entities.PreEmploymentDetails> GetAllPreEmploymentDetails()
        {
            return _preEmploymentDetails.GetAllPreEmploymentDetails();
        }
        public List<Entities.PreEmploymentDetails> SearchPreEmploymentDetails(Entities.PreEmploymentDetails preEmploymentDetails)
        {
            return _preEmploymentDetails.SearchPreEmploymentDetails(preEmploymentDetails);
        }

        public Int32 SavePreEmploymentDetails(Entities.PreEmploymentDetails preEmploymentDetails)
        {
            return _preEmploymentDetails.SavePreEmploymentDetails(preEmploymentDetails);
        }


    }
}
