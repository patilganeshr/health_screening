using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

namespace SOFARCH.HealthScreening.Business
{
    public class WorkingPeriod
    {
        private readonly DataModel.WorkingPeriod _workingPeriod;

        public WorkingPeriod()
        {
            _workingPeriod = new DataModel.WorkingPeriod();
        }

        /// <summary>
        /// Add working period
        /// </summary>
        /// <param name="workingPeriod">Specifies an object of an entity class WorkingPeriod.</param>
        /// <returns>An integer value as WorkingPeriodId of a inserted record.</returns>
        public Int32 SaveWorkingPeriod(Entities.WorkingPeriod workingPeriod)
        {
            return _workingPeriod.SaveWorkingPeriod(workingPeriod);
        }

        /// <summary>
        /// Delete working period.
        /// </summary>
        /// <param name="workingPeriod">Specifies an object of an entity class WorkingPeriod.</param>
        /// <returns>A boolean value of True if records get deleted successfully else False if failed.</returns>
        public bool DeleteWorkingPeriod(Entities.WorkingPeriod workingPeriod)
        {
            return _workingPeriod.DeleteWorkingPeriod(workingPeriod);
        }

        /// <summary>
        /// Gets the list of all working periods.
        /// </summary>
        /// <returns>A collection of all working periods.</returns>
        public List<Entities.WorkingPeriod> GetAllWorkingPeriods()
        {
            return _workingPeriod.GetAllWorkingPeriods();
        }

        /// <summary>
        /// Gets the financial year.
        /// </summary>
        /// <param name="workingPeriodId">Specifies the an integer value of WorkingPeriodId.</param>
        /// <returns>A string value of financial year.</returns>
        public string GetFinancialYearById(Int32 workingPeriodId)
        {
            return _workingPeriod.GetFinancialYearById(workingPeriodId);
        }
        
        
    }
}
