USE [Carte]
GO
/****** Object:  StoredProcedure [dbo].[Orders_MonthlySales_ByOrgId]    Script Date: 10/21/2022 9:50:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author: John Deza
-- Create date: 10/10/2022
-- Description: Proc for getting total amount of sales per month
-- Code Reviewer: 

-- MODIFIED BY: 
-- MODIFIED DATE: 
-- Code Reviewer:
-- Note:
-- =============================================
	ALTER PROC [dbo].[Orders_MonthlySales_ByOrgId]
									@orgId int

	AS




	/*  ---------------TEST---------------
	    declare @orgId int = 8
		EXECUTE dbo.Orders_MonthlySales_ByOrgId
							@orgId
				
	*/
	

	BEGIN
	
	
	SELECT     YEAR(datecreated) AS yr
			  ,MONTH(datecreated) as mth
			  ,SUM(totalamount) AS MonthRevenueTotal
			
	FROM   dbo.orders as o
	WHERE  organizationId = @orgId
	GROUP BY  MONTH(datecreated)
			 ,YEAR(datecreated)

	ORDER BY YEAR(datecreated)
			,MONTH(datecreated)
			 

	END
