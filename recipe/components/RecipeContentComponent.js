import TagComponent from "components/TagComponent";

const RecipeContentComponent = ({ title, items, tagTextColor, tagBgColor }) => {
    return (
        <div>
            <h5 className="font-medium mb-2">{title}</h5>
            <div className="flex gap-2 flex-wrap">
                { items &&
                    items.map((item, index) => (
                        <TagComponent
                            key={index}
                            label={item}
                            textColor={tagTextColor}
                            bgColor={tagBgColor}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default RecipeContentComponent;