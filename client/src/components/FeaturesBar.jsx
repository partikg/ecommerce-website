import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faArrowLeftRotate, faAward, faCashRegister } from "@fortawesome/free-solid-svg-icons";

export default function FeaturesBar() {
    return (
        <div className="bg-black h-10 flex justify-center text-white text-sm items-center gap-10">
            <div><FontAwesomeIcon icon={faTruck} /> Free Shipping</div>
            <div><FontAwesomeIcon icon={faArrowLeftRotate} /> Free Returns</div>
            <div><FontAwesomeIcon icon={faAward} /> Earn Points</div>
            <div><FontAwesomeIcon icon={faCashRegister} /> Pay Later</div>
        </div>
    );
}