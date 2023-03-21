import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useTrace } from "../context/TraceContext";
import { useTheme } from "../context/ThemeContext";
//import { onDragEnd } from "../DragAndDrop/onDragEnd";


function Tracer() {
  const { modalOpen } = useTheme();
  const { columns, setColumns, onDragEnd } = useTrace()

  return (
    <div
      className={`flex justify-between h-full ${modalOpen ? "screen" : ""} overflow-x-auto p-6 bg-bluishWhite`}
    >
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        shouldAnimateDrop={false}
        className="overflow-auto bg-blue-100"
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              key={columnId}
            >
              {console.log(column)}
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-cornflower mr-2"></div>
                <h2>{column.name + "   (" + column.items.length + ") "}</h2>
              </div>

              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`${
                          snapshot.isDraggingOver ? "bg-icyBlue" : " "
                        } w-80 p-4 hscreen`}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="bg-white text-black shadow rounded-md"
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      transition:
                                        "transform 0.2s ease-outerHeight",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    <p>
                                      <span className="text-blackishGray font-light">
                                        {" "}
                                        Job Role :{" "}
                                      </span>
                                      {item.jobRole}
                                    </p>
                                    <p>
                                      <span className="text-blackishGray font-light">
                                        {" "}
                                        Company Name:{" "}
                                      </span>
                                      {item.jobName}
                                    </p>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default Tracer;
