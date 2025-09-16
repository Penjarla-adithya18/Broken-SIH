import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  Button,
  Chip,
  TextField,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import "../styles/ConflictResolution.css";

const initialConflicts = [
  {
    id: 1,
    type: "Delay",
    affectedTrains: ["101", "102"],
    location: "Section 3",
    time: "2025-09-14 10:30",
    status: "Unresolved",
    resolution: "",
    assigned: "Controller A",
    comments: "",
    priority: "High",
    attachments: [],
  },
  {
    id: 2,
    type: "Track Block",
    affectedTrains: ["103"],
    location: "Section 1",
    time: "2025-09-14 11:00",
    status: "Resolved",
    resolution: "Rerouted via Section 2",
    assigned: "Controller B",
    comments: "Issue fixed",
    priority: "Medium",
    attachments: ["screenshot1.png"],
  },
];

const ConflictResolution = () => {
  const [conflicts, setConflicts] = useState(initialConflicts);
  const [selected, setSelected] = useState<number | null>(null);
  const [resolution, setResolution] = useState("");
  const [comments, setComments] = useState("");

  const handleApprove = (id: number) => {
    setConflicts(
      conflicts.map((c) =>
        c.id === id
          ? { ...c, status: "Resolved", resolution, comments }
          : c
      )
    );
    setSelected(null);
    setResolution("");
    setComments("");
  };

  return (
    <Box className="conflict-container">
      <Typography variant="h4" gutterBottom className="conflict-title">
        Conflict Resolution
      </Typography>

      <Grid container spacing={2}>
        {/* Conflict List */}
        <Grid item xs={12} md={6}>
          <List>
            {conflicts.map((conflict) => (
              <Paper key={conflict.id} className="conflict-card">
                <Typography variant="h6" className="conflict-header">
                  Conflict #{conflict.id} - {conflict.type}
                </Typography>
                <Chip
                  className="conflict-chip"
                  label={conflict.status}
                  color={conflict.status === "Resolved" ? "success" : "warning"}
                />
                <Typography className="conflict-detail">
                  <b>Affected Trains:</b>{" "}
                  {conflict.affectedTrains.join(", ")}
                </Typography>
                <Typography className="conflict-detail">
                  <b>Location/Section:</b> {conflict.location}
                </Typography>
                <Typography className="conflict-detail">
                  <b>Time:</b> {conflict.time}
                </Typography>
                <Typography className="conflict-detail">
                  <b>Priority:</b> {conflict.priority}
                </Typography>
                <Typography className="conflict-detail">
                  <b>Assigned:</b> {conflict.assigned}
                </Typography>
                <Typography className="conflict-detail">
                  <b>Resolution Actions:</b>{" "}
                  {conflict.resolution || "None yet"}
                </Typography>
                <Typography className="conflict-detail">
                  <b>Comments:</b> {conflict.comments || "None yet"}
                </Typography>
                <Typography className="conflict-detail">
                  <b>Attachments:</b>{" "}
                  {conflict.attachments.length
                    ? conflict.attachments.join(", ")
                    : "None"}
                </Typography>

                {conflict.status !== "Resolved" && (
                  <Button
                    variant="contained"
                    color="primary"
                    className="resolve-button"
                    onClick={() => setSelected(conflict.id)}
                  >
                    Resolve
                  </Button>
                )}
              </Paper>
            ))}
          </List>
        </Grid>

  {/* Resolve Form */}
  <Grid item xs={12} md={6}>
          {selected !== null && (
            <Paper className="resolve-form">
              <Typography variant="h6" gutterBottom>
                Resolve Conflict #{selected}
              </Typography>
              <TextField
                label="Resolution Action"
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Comments/Notes"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                fullWidth
                margin="normal"
                multiline
                rows={3}
              />
              <Button
                variant="contained"
                color="success"
                className="resolve-button"
                onClick={() => handleApprove(selected)}
              >
                Mark as Resolved
              </Button>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ConflictResolution;
