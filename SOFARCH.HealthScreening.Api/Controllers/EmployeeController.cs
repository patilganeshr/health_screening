using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SOFARCH.HealthScreening.API.Controllers
{
    public class EmployeeController : ApiController
    {
        private readonly Business.Employee _employee;

        public EmployeeController()
        {
            _employee = new Business.Employee();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="employee"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("SaveEmployee")]
        public Int32 SaveEmployee(Entities.Employee employee)
        {
            return _employee.SaveEmployee(employee);
        }

        [HttpGet]
        [Route("IsEmployeeNameExists/{companyId}/{employeeName}")]
        public bool IsEmployeeNameExists(Int32 companyId, string employeeName)
        {
            return _employee.IsEmployeeNameExists(companyId, employeeName);
        }

        [HttpGet]
        [Route("IsExmployeeCodeExists/{companyId}/{employeeCode}")]
        public bool IsEmployeeCodeExists(Int32 companyId, string employeeCode)
        {
            return _employee.IsEmployeeCodeExists(companyId, employeeCode);
        }


        /// <summary>
        /// /
        /// </summary>
        /// <returns></returns>
        [Route("GetAllEmployees")]
        public List<Entities.Employee> GetAllEmployees()
        {
            return _employee.GetAllEmployees();
        }

        
        [HttpGet]
        [Route("SearchAllEmployees")]
        public List<Entities.Employee> SearchAllEmployees()
        {
            return _employee.SearchAllEmployees();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="employeeId"></param>
        /// <returns></returns>
        [Route("GetEmployeeDetailsById/{employeeId}")]
        public Entities.Employee GetEmployeeDetailsById(Int32 employeeId)
        {
            return _employee.GetEmployeeDetailsById(employeeId);
        }

    }
}
