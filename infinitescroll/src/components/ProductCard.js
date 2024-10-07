import "./ProductCard.css";
const ProductCard = ({product})=>{
    const {email, name, picture} = product;
    return(
    <div className="product_card">
        <p>{email}</p>
        <p>{name.first}</p>
         <img src={picture.large} className="product_image" alt="alternative_image"></img> 
    </div>)
}
export default ProductCard;