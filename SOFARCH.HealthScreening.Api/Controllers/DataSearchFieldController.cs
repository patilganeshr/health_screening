using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SOFARCH.HealthScreening.Api.Controllers
{
    public class DataSearchFieldController : ApiController
    {
        private readonly Business.DataSearchField _searchField;

        public DataSearchFieldController()
        {
            _searchField = new Business.DataSearchField();
        }

        [Route("GetSearchFields/{pageId}")]
        public List<Entities.DataSearchField> GetSearchFields(Int32 pageId)
        {
            return _searchField.GetSearchFields(pageId);
        }

        [Route("GetSearchOperators")]
        public List<Entities.DataSearchOperators> GetSearchOperators()
        {
            return _searchField.GetSearchOperators();
        }

    }
}
