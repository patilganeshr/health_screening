using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Business
{
    public class City
    {
        private readonly DataModel.City _city;

        public City()
        {
            _city = new DataModel.City();
        }


        public Int32 AddCity(Entities.City city)
        {
            return _city.AddCity(city);
        }

        public bool DeleteCity(Entities.City city)
        {
            return _city.DeleteCity(city);
        }

        public bool IsCityNameExists(Int32 stateId, string cityName)
        {
            return _city.IsCityNameExists(stateId, cityName);
        }

        public Int32 UpdateCity(Entities.City city)
        {
            return _city.UpdateCity(city);
        }

        public List<Entities.City> GetCitiesByState(Int32 stateId)
        {
            return _city.GetCitiesByState(stateId);
        }

        public Int32 SaveCity(Entities.City city)
        {
            return _city.SaveCity(city);
        }
    }
}
