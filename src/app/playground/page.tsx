import Playground from "@/components/Playground";
import React from "react";

const PlaygroundPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">vi-mongo Playground</h1>
      <p className="mb-4">
        Try out vi-mongo directly in your browser. Type &quot;vi-mongo&quot; to start the
        application.
      </p>
      <Playground />
    </div>
  );
};

export default PlaygroundPage;
