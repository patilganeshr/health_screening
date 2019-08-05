using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOFARCH.HealthScreening.Business
{
    public class DataSearchField
    {
        private readonly DataModel.DataSearchField _searchField;

        public DataSearchField()
        {
            _searchField = new DataModel.DataSearchField();
        }

        public List<Entities.DataSearchField> GetSearchFields(Int32 pageId)
        {
            return _searchField.GetSearchFields(pageId);
        }

        public List<Entities.DataSearchOperators> GetSearchOperators()
        {
            return _searchField.GetSearchOperators();
        }

    }
}
