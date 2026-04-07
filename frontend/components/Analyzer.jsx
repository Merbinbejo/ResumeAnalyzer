import React from "react";
import { useLocation } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const Analyzer = () => {
  const location = useLocation();
  const data = location.state;

  if (!data) {
    return <h2>No Data Found</h2>;
  }

  const matchScore = Math.round(data.score);
  const missingScore = 100 - matchScore;

  const chartData = [
    { name: "Matched", value: matchScore },
    { name: "Missing", value: missingScore },
  ];

  const COLORS = ["#28a745", "#dc3545"];

  return (
    <div className="analyzer">
      <h2 style={{ textAlign: "center" }}>Resume Match Score</h2>

      {/* Donut Chart */}
      <div style={{ width: "100%", height: "400px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={5}
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 🔥 Colored Score Boxes */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            background: "#28a745",
            color: "white",
            padding: "10px 20px",
            borderRadius: "10px",
            fontWeight: "bold",
          }}
        >
          Match: {matchScore}%
        </div>

        <div
          style={{
            background: "#dc3545",
            color: "white",
            padding: "10px 20px",
            borderRadius: "10px",
            fontWeight: "bold",
          }}
        >
          Missing: {missingScore}%
        </div>
      </div>

      {/* MATCH SKILLS */}
      <div>
        <h2>Match Skills</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {data.match_skills.map((skill) => (
            <span
              key={skill}
              style={{
                background: "green",
                color: "white",
                padding: "5px 10px",
                borderRadius: "15px",
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* MISSING SKILLS */}
      <div>
        <h2>Missing Skills</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            paddingBottom: "50px",
          }}
        >
          {data.missing_skills.map((skill) => (
            <span
              key={skill}
              style={{
                background: "red",
                color: "white",
                padding: "5px 10px",
                borderRadius: "15px",
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analyzer;
