using Amazon.Runtime.Internal.Util;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models.Domain;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/revenue")]
    [ApiController]
    public class RevenueApiController : BaseApiController
    {
        private IRevenueService _revenueService = null;
        private IAuthenticationService<int> _authService = null;
        public RevenueApiController(IRevenueService service,
            ILogger<RevenueApiController> logger,
            IAuthenticationService<int> authService) : base(logger)
        {
            _revenueService = service;
            _authService = authService;
        }
        [HttpGet("{orgId:int}")]
        public ActionResult<ItemsResponse<OrgRevenue>> GetByOrgId(int orgId)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                List<OrgRevenue> list = _revenueService.GetByOrgId(orgId);
                if(list == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Revenue data not found");
                }
                else
                {
                    response = new ItemsResponse<OrgRevenue> { Items = list };
                }
            }
            catch(Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse($"Generic Error: {ex.Message}");
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(iCode, response);
        }
    }
}
