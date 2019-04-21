using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Business
{
    public class Country
    {
        private readonly DataModel.Country _country;

        public Country()
        {
            _country = new DataModel.Country();
        }

        public List<Entities.Country> GetAllCountries()
        {
            return _country.GetAllCountries();
        }
    }
}
