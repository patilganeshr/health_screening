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

        public Entities.PreEmploymentDetails GetEmployeeDetails(Int32 employeeId)
        {
            return _preEmploymentDetails.GetEmployeeDetails(employeeId);
        }

        public List<Entities.PreEmploymentDetails> GetAllPreEmploymentDetails()
        {
            return _preEmploymentDetails.GetAllPreEmploymentDetails();
        }
        public Int32 SavePreEmploymentDetails(Entities.PreEmploymentDetails preEmploymentDetails)
        {
            return _preEmploymentDetails.SavePreEmploymentDetails(preEmploymentDetails);
        }


    }
}
