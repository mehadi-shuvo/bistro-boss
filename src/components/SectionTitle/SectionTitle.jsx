
const SectionTitle = ({subTitle, title}) => {
    return (
        <div className="text-center w-[300px] mx-auto">
            <h3 className="text-xl text-[#D99904] border-b-2 pb-5">--- {subTitle} ---</h3>
            <h3 className="text-4xl uppercase text-[#151515] border-b-2 pb-6 mb-12">{title}</h3>
        </div>
    );
};

export default SectionTitle;