using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Business
{
    public class MedicalTest
    {
        private readonly DataModel.MedicalTest _medicalTest;

        public MedicalTest()
        {
            _medicalTest = new DataModel.MedicalTest();
        }

        public List<Entities.MedicalTest> GetMedicalTestIdAndName()
        {
            return _medicalTest.GetMedicalTestIdAndName();
        }

        public List<Entities.MedicalTest> SearchAllMedicalTests()
        {
            return _medicalTest.SearchAllMedicalTests();
        }

        public Entities.MedicalTest SearchMedicalTestByName(string testName)
        {
            return _medicalTest.SearchMedicalTestByName(testName);
        }

        public Int32 SaveMedicalTest(Entities.MedicalTest medicalTest)
        {
            return _medicalTest.SaveMedicalTest(medicalTest);
        }


    }
}
