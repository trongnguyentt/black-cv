package blackcv.repository.impl;

import blackcv.domain.Company;
import blackcv.repository.custom.CompanyRepositoryCustom;
import org.springframework.data.domain.Pageable;
import org.springframework.util.MultiValueMap;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CompanyRepositoryImpl implements CompanyRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Company> search(MultiValueMap<String, String> queryParams, Pageable pageable) {
//        String sql = "select C from Company C where C.status <> 0 ";
////        Map<String, Object> values = new HashMap<>();
////        sql += createWhereQuery(queryParams, values);
////        sql += createOrderQuery(queryParams);
////        Query query = entityManager.createQuery(sql, Company.class);
////        values.forEach(query::setParameter);
////        query.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
////        query.setMaxResults(pageable.getPageSize());
////        return query.getResultList();


        Map<String, Object> values = new HashMap<>();
        if (queryParams.containsKey("login") && !queryParams.get("author").get(0).contains("ROLE_ADMIN")) {
            String sql = "select C from Company C where C.status <> 0 and C.createdBy like :login";
            values.put("login", queryParams.get("login").get(0));
            sql += createWhereQuery(queryParams, values);
            sql += createOrderQuery(queryParams);
            Query query = entityManager.createQuery(sql, Company.class);
            values.forEach(query::setParameter);
            query.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
            query.setMaxResults(pageable.getPageSize());
            return query.getResultList();
        } else {
            String sql = "select C from Company C where C.status <> 0 ";
            sql += createWhereQuery(queryParams, values);
            sql += createOrderQuery(queryParams);
            Query query = entityManager.createQuery(sql, Company.class);
            values.forEach(query::setParameter);
            query.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
            query.setMaxResults(pageable.getPageSize());
            return query.getResultList();
        }

    }

    @Override
    public Long countCompany(MultiValueMap<String, String> queryParams) {
        String sql = "select count(C) from Company C where C.status <> 0";
        Map<String, Object> values = new HashMap<>();
        sql += createWhereQuery(queryParams, values);
        Query query = entityManager.createQuery(sql, Long.class);
        values.forEach(query::setParameter);
        return (Long) query.getSingleResult();
    }

    private String createWhereQuery(MultiValueMap<String, String> queryParams, Map<String, Object> values) {
        String sql = "";
        if (queryParams.containsKey("name")) {
//            sql += "and lower(C.name) like lower(:name)";
//            values.put("name", queryParams.get("name").get(0));

//            sql += "and (lower(C.name) like lower(:name) or lower(C.businessAreas) like lower(:name))";
            sql += "and lower(C.name) like lower(:name)";
            values.put("name", '%' + queryParams.get("name").get(0) + '%');
        }

        if (queryParams.containsKey("business")) {
            sql += "and lower(C.businessAreas) like lower(:business)";
            values.put("business", "%" + queryParams.get("business").get(0) + "%");
        }

        return sql;
    }

    private String createOrderQuery(MultiValueMap<String, String> queryParams) {
        String sql = " order by ";
        if (queryParams.containsKey("sort")) {
            List<String> orderByList = queryParams.get("sort");
            for (String i : orderByList) {
                sql += "C." + i.replace(",", " ") + ", ";
            }
            sql = sql.substring(0, sql.lastIndexOf(","));
        } else {
            sql += "C.createdDate desc";
        }
        return sql;
    }
}
