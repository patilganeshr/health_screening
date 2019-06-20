using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

namespace SOFARCH.HealthScreening.Business
{
    public class Employee
    {
        private readonly DataModel.Employee _employee;

        public Employee()
        {
            _employee = new DataModel.Employee();
        }

        public Int32 SaveEmployee(Entities.Employee employee)
        {
            return _employee.SaveEmployee(employee);
        }

        public bool IsEmployeeNameExists(Int32 companyId, string employeeName)
        {
            return _employee.IsEmployeeNameExists(companyId, employeeName);
        }

        /// <summary>
        /// /
        /// </summary>
        /// <returns></returns>
        public List<Entities.Employee> GetAllEmployees()
        {
            return _employee.GetAllEmployees();
        }

        public List<Entities.Employee> SearchAllEmployees()
        {
            return _employee.SearchAllEmployees();
        }

        public List<Entities.Employee> GetEmployeeIdAndNameByEmployeeName(string employeeName)
        {
            return _employee.GetEmployeeIdAndNameByEmployeeName(employeeName);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="employeeId"></param>
        /// <returns></returns>
        public Entities.Employee GetEmployeeDetailsById(Int32 employeeId)
        {
            return _employee.GetEmployeeDetailsById(employeeId);
        }
        
    }
}
