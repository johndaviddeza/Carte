USE [Carte]
GO
/****** Object:  StoredProcedure [dbo].[MenuItems_TopSelling_ByOrgId]    Script Date: 10/21/2022 9:48:19 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:John Deza
-- Create date: 10/06/2022
-- Description:This proc is selects the highest selling menu items by org Id. 
-- Code Reviewer:

-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

/*----------------TEST CODE---------------------

declare @OrgId int = 8

execute dbo.MenuItems_TopSelling_ByOrgId
							@OrgId

*/

ALTER proc [dbo].[MenuItems_TopSelling_ByOrgId]
							@OrgId int

as


begin



select distinct  mi.Id
      ,mi.[OrganizationId]
	  ,o.Name
	  ,o.Logo
	  ,o.SiteUrl
      ,st.Id as StatusId 
	  ,st.Name as Status
      ,mi.[UnitCost]
      ,mi.[Name]
      ,mi.[Description]
      ,mi.[ImageUrl]
      ,mi.[CreatedBy]
      ,mi.[ModifiedBy]
      ,mi.[DateCreated]
      ,mi.[DateModified]
      ,mi.[IsDeleted]
	  ,mi.[IsPublished]
	  ,Tags = ( SELECT   t.Id, t.[Name]
				FROM	dbo.Tags AS t inner join dbo.MenuItemTags AS mit 
				ON		t.Id = mit.TagId
				WHERE	 mi.Id = mit.MenuItemId 					
				FOR JSON AUTO)	
	  ,Ingredients = ( Select Distinct i.Id
							,i.Name
							,i.UnitCost
							,i.ImageUrl
							,i.CreatedBy
						From dbo.Ingredients as i inner join dbo.MenuItemIngredients as mii
									on  i.Id = mii.IngredientId
							Where mi.Id = mii.MenuItemId
						For JSON AUTO
						)
		,FoodSafeTypes = ( Select Distinct fst.Id
								 ,fst.Name
							From dbo.FoodSafeTypes as fst inner join dbo.DietaryRestrictions as dr
									on  fst.Id = dr.FoodSafeTypeId
							Where dr.MenuItemId = mi.Id
						For JSON AUTO
						)
		,ord.TotalAmount
	    ,TotalCount = COUNT(1) OVER() 
	  
  FROM dbo.MenuItems as mi 
		inner join dbo.Organizations as o
				on mi.OrganizationId = o.Id
		inner join dbo.Orders as ord
				on o.Id = ord.OrganizationId
		inner join dbo.StatusTypes as st
				on ord.OrderStatusId = st.Id
		inner join dbo.Users as u
				on mi.CreatedBy = u.Id 
		inner join dbo.Users as u1 
				on mi.ModifiedBy = u1.Id	 
				  
Where o.Id = @OrgId  
	ORDER BY ord.TotalAmount DESC				  


	end

