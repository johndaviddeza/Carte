using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Orders;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class RevenueService : IRevenueService
    {
        IDataProvider _data = null;

        public RevenueService(IDataProvider data)
        {
            _data = data;

        }
        public List<OrgRevenue> GetByOrgId(int orgId)
        {
            string procName = "[dbo].[Orders_MonthlySales_ByOrgId]";
            List<OrgRevenue> list = null;
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@OrgId", orgId);

            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                OrgRevenue revenue = MapSingleOrgRevenue(reader, ref startingIndex);

                if (list == null)
                {
                    list = new List<OrgRevenue>();
                }

                list.Add(revenue);
            });
            return list;
        }

        private static OrgRevenue MapSingleOrgRevenue(IDataReader reader, ref int startingIndex)
        {
            OrgRevenue revenue = new OrgRevenue();
            revenue.Year = reader.GetSafeInt32(startingIndex++);
            revenue.Month = reader.GetSafeInt32(startingIndex++);
            revenue.MonthRevenueTotal = reader.GetSafeDecimal(startingIndex++);
           return revenue;
        }
    }
}
