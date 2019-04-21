
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

namespace SOFARCH.HealthScreening.Business
{
    public class UnitsOfMeasurement
    {
        private readonly DataModel.UnitsOfMeasurement _unitsOfMeasurement;

        public UnitsOfMeasurement()
        {
            _unitsOfMeasurement = new DataModel.UnitsOfMeasurement();
        }

        
        /// <summary>
        /// Get all style sizes
        /// </summary>
        /// <returns>Return as list of style sizes</returns>
        public List<Entities.UnitsOfMeasurement> GetAllUnitsOfMeasurement()
        {
            return _unitsOfMeasurement.GetAllUnitsOfMeasurement();
        }
 
    }
}
