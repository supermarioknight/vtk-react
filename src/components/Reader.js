import { React, useRef, useContext, useEffect } from "react";
// import vtkColorMaps from "@kitware/vtk.js/Rendering/Core/ColorTransferFunction/ColorMaps.js";
import { useStateContext } from "../context";
import ControlBar from "./ControlBar";
import {
  View,
  ShareDataSet,
  SliceRepresentation,
  Reader,
  Contexts,
  VolumeController,
  VolumeRepresentation,
} from "react-vtk-js";

function DisableMouse() {
  const view = useContext(Contexts.ViewContext);
  const clicks = useRef(0);
  useEffect(() => {
    clicks.current = 0;
    view.defaultStyle.setRotationFactor(0);
  }, [view]);
  return null;
}

function Example() {
  const { uploadedFile } = useStateContext();
  const {
    iSlice,
    jSlice,
    kSlice,
    colorWindow,
    colorLevel,
    colorPreset,
    singleView,
    viewOne,
    viewTwo,
    viewThree,
    viewFour,
  } = useStateContext();

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        background: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        padding: "20px",
      }}
    >
      <ShareDataSet>
        <Reader vtkClass="vtkXMLImageDataReader" url={uploadedFile} />
      </ShareDataSet>
      <div style={{ width: "100%", height: "100%", display: "flex" }}>
        <ControlBar />
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "grid",
            gap: "10px",
            gridTemplateColumns: singleView ? " auto" : "auto auto",
          }}
          id="DivContainerForViews"
        >
          <div style={{ display: viewOne ? "flex" : "none" }}>
            <View
              id="0"
              cameraPosition={[0, 0, 1]}
              cameraViewUp={[0, 1, 0]}
              cameraParallelProjection={true}
              background={[0, 0, 0]}
              className="one"
            >
              <ShareDataSet>
                <Reader vtkClass="vtkXMLImageDataReader" url={uploadedFile} />
              </ShareDataSet>

              <SliceRepresentation
                kSlice={kSlice}
                property={{
                  colorWindow,
                  colorLevel,
                }}
                colorMapPreset={colorPreset}
              >
                <ShareDataSet />

                <DisableMouse />
              </SliceRepresentation>
            </View>
          </div>

          <div style={{ display: viewTwo ? "flex" : "none" }}>
            <View
              id="1"
              cameraPosition={[360, 0, 0]}
              cameraViewUp={[0, 0, -1]}
              cameraParallelProjection={true}
              background={[0, 0, 0]}
              className="two"
            >
              <ShareDataSet>
                <Reader vtkClass="vtkXMLImageDataReader" url={uploadedFile} />
              </ShareDataSet>

              <SliceRepresentation
                iSlice={iSlice}
                property={{
                  colorWindow,
                  colorLevel,
                }}
                colorMapPreset={colorPreset}
              >
                <ShareDataSet />
                <DisableMouse />
              </SliceRepresentation>
            </View>
          </div>

          <div style={{ display: viewThree ? "flex" : "none" }}>
            <View
              id="2"
              cameraPosition={[0, -180, 0]}
              cameraViewUp={[0, 0, -1]}
              cameraParallelProjection={true}
              background={[0, 0, 0]}
              className="three"
            >
              <ShareDataSet>
                <Reader vtkClass="vtkXMLImageDataReader" url={uploadedFile} />
              </ShareDataSet>
              <SliceRepresentation
                jSlice={jSlice}
                property={{
                  colorWindow,
                  colorLevel,
                }}
                colorMapPreset={colorPreset}
              >
                <ShareDataSet />
                <DisableMouse />
              </SliceRepresentation>
            </View>
          </div>

          <div style={{ display: viewFour ? "flex" : "none" }}>
            <View
              id="0"
              background={[0, 0, 0]}
              cameraPosition={[1, 0, 0]}
              cameraViewUp={[0, 0, -1]}
              cameraParallelProjection={false}
              className="four"
            >
              <VolumeRepresentation>
                <VolumeController />
                <ShareDataSet />
              </VolumeRepresentation>
            </View>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Example;
