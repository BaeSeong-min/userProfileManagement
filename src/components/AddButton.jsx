import '../style/AddButton.css';

export default function AddButton({ onClick }) {
  return (
    <button className="add-button" onClick={onClick}>
      팀원 추가하기 +
    </button>
  );
}