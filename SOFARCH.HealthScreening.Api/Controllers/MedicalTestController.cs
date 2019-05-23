using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SOFARCH.HealthScreening.Api.Controllers
{
    public class MedicalTestController : ApiController
    {
        private readonly Business.MedicalTest _medicalTest;

        public MedicalTestController()
        {
            _medicalTest = new Business.MedicalTest();
        }

        [Route("GetMedicalTestIdAndName")]
        public List<Entities.MedicalTest> GetMedicalTestIdAndName()
        {
            return _medicalTest.GetMedicalTestIdAndName();
        }

        [HttpGet]
        [Route("SearchAllMedicalTests")]
        public List<Entities.MedicalTest> SearchAllMedicalTests()
        {
            return _medicalTest.SearchAllMedicalTests();
        }

        [HttpGet]
        [Route("SearchMedicalTestByName/{testName}")]
        public Entities.MedicalTest SearchMedicalTestByName(string testName)
        {
            return _medicalTest.SearchMedicalTestByName(testName);
        }

        [HttpPost]
        [Route("SaveMedicalTest")]
        public Int32 SaveMedicalTest(Entities.MedicalTest medicalTest)
        {
            return _medicalTest.SaveMedicalTest(medicalTest);
        }

    }
}
