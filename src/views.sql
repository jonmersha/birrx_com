create view product_full as
SELECT 
    p.product_id, 
    p.category_id,
    p.product_name, 
    p.description, 
    p.price, 
    p.stock, 
    p.image_url, 
    p.created_at,
    p.updated_at,
    p.merchant_id,
    COUNT(pl.like_id) AS total_likes, 
    COUNT(pv.view_id) AS total_views
FROM 
    products p
LEFT JOIN 
    product_likes pl ON p.product_id = pl.product_id
LEFT JOIN 
    product_views pv ON p.product_id = pv.product_id
GROUP BY 
    p.product_id;