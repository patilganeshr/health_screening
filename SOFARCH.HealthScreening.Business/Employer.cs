using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

namespace SOFARCH.HealthScreening.Business
{
    public class Employer
    {
        private readonly DataModel.Employer _employer;

        public Employer()
        {
            _employer = new DataModel.Employer();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="employer"></param>
        /// <returns></returns>
        public Int32 SaveEmployer(Entities.Employer employer)
        {
            return _employer.SaveEmployer(employer);
        }
                
        /// <summary>
        /// /
        /// </summary>
        /// <returns></returns>
        public List<Entities.Employer> GetAllEmployers()
        {
            return _employer.GetAllEmployers();
        }
        
        public List<Entities.Employer> SearchEmployerByName (string employerName)
        {
            return _employer.SearchEmployerByName(employerName);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="employerId"></param>
        /// <returns></returns>
        public Entities.Employer GetEmployerDetailsById(Int32 employerId)
        {
            return _employer.GetEmployerDetailsById(employerId);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="employerName"></param>
        /// <returns></returns>
        public Entities.Employer GetEmployerDetailsByName(string employerName)
        {
            return null; //_employer.GetEmployerDetailsByName(employerName);
        }

    }
}
