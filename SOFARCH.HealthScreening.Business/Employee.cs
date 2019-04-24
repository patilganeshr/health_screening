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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="employee"></param>
        /// <returns></returns>
        public bool DeleteEmployee(Entities.Employee employee)
        {
            return _employee.DeleteEmployee(employee);
        }

        /// <summary>
        /// /
        /// </summary>
        /// <returns></returns>
        public List<Entities.Employee> GetAllEmployees()
        {
            return _employee.GetAllEmployees();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="branchId"></param>
        /// <returns></returns>
        public List<Entities.Employee> GetAllEmployeesByBranch(Int32 branchId)
        {
            return _employee.GetAllEmployeesByBranch(branchId);
        }

        public List<Entities.Employee> SearchEmployeeByBranchOrName(Int32? branchId, string employeeName = null)
        {
            return _employee.SearchEmployeeByBranchOrName(branchId, employeeName);
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
