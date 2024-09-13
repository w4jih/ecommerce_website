package com.luv2code.ecommerce.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.luv2code.ecommerce.entity.Country;
import com.luv2code.ecommerce.entity.Product;
import com.luv2code.ecommerce.entity.ProductCategory;
import com.luv2code.ecommerce.entity.State;

import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;


@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private EntityManager entityManager;

    @Autowired
    public MyDataRestConfig(EntityManager theEntityManager){
      entityManager=theEntityManager;
    }


    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] theUnsuportedActions={HttpMethod.PUT,HttpMethod.POST,HttpMethod.DELETE};

        //diable th http method for Product: PUT , POST and DELETE
        diableHttpMethods(Product.class,config, theUnsuportedActions);

        //diable HTTP methods for ProductCategory: PUT, POST and DELETE
       diableHttpMethods(ProductCategory.class,config, theUnsuportedActions);
              
       diableHttpMethods(Country.class,config, theUnsuportedActions);
       diableHttpMethods(State.class,config, theUnsuportedActions);

       //call an internal helper method
              exposeIds(config);
              }


private void diableHttpMethods( Class theClass,RepositoryRestConfiguration config, HttpMethod[] theUnsuportedActions) {
       config.getExposureConfiguration()
               .forDomainType(theClass)
               .withItemExposure((metdata,httpMethods) -> httpMethods.disable(theUnsuportedActions))
               .withCollectionExposure((metdata,httpMethods) ->httpMethods.disable(theUnsuportedActions));
}
              private void exposeIds(RepositoryRestConfiguration config){
                     //expose entity ids


                     //get a list of all entity classes from the entity manager
                     Set<EntityType<?>> entities=entityManager.getMetamodel().getEntities();

                     // create an array of the entitis types
                     List<Class> entityClasses =new ArrayList<>(); 

                     // get the entity types for the entities
                     for(EntityType tempEntityType : entities){
                            entityClasses.add(tempEntityType.getJavaType());
                     }

                     // expose the entity ids for the array of entity/domain types
                     Class[] domainType = entityClasses.toArray(new Class[0]);
                     config.exposeIdsFor(domainType);

              }
}
