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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="employee"></param>
        /// <returns></returns>
        [Route("DeleteEmployee")]
        public bool DeleteEmployee(Entities.Employee employee)
        {
            return _employee.DeleteEmployee(employee);
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="employerId"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("GetAllEmployeesByEmployer/{employerId}")]
        public List<Entities.Employee> GetAllEmployeesByEmployer(Int32 employerId)
        {
            return _employee.GetAllEmployeesByEmployer(employerId);
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
