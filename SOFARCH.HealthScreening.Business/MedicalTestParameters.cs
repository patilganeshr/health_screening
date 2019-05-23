using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Business
{
    public class MedicalTestParameters
    {
        private readonly DataModel.MedicalTestParameters _medicalTestParameters;

        public MedicalTestParameters()
        {
            _medicalTestParameters = new DataModel.MedicalTestParameters();
        }

        public List<Entities.MedicalTestParameters> GetTestParametersByTestId(Int32 medicalTestId)
        {
            return _medicalTestParameters.GetMedicalTestParameterDetailsByTestId(medicalTestId);
        }


    }
}
