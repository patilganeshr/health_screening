using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Business
{
    public class Location
    {
        private readonly DataModel.Location _location;

        public Location()
        {
            _location = new DataModel.Location();
        }

        /// <summary>
        /// Get All Locations with Location Type
        /// </summary>
        /// <returns>Will return a list of Location.</returns>
        public List<Entities.Location> GetAllLocationsWithLocationTypes()
        {
            return _location.GetAllLocationsWithLocationTypes();
        }

    }
}
